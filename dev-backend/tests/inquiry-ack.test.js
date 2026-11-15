/**
 * 시스템 문의 접수 확인 — routes/support-tickets.js POST + utils/inquiryAck.js
 * (2026-11-15 Irene «권고대로» · Fable 설계 .claude/fable-design-20261115-inquiry-autoreply-board.md §2-3 완료 기준 1·2·3)
 * 고장주입: shouldAcknowledgeTicket 의 제외 조건 하나를 빼면 «보내지 않는 경우» 테스트가 실패해야 한다.
 */
const mockCreate = jest.fn();
const mockFindByPk = jest.fn();
const mockSendNative = jest.fn();
const mockAdminIds = jest.fn();

jest.mock('../models/SupportTicket', () => ({ create: (...a) => mockCreate(...a) }));
jest.mock('../models/User', () => ({ findByPk: (...a) => mockFindByPk(...a) }));
jest.mock('../middleware/auth', () => ({
  authenticateToken: (req, _res, next) => { req.user = JSON.parse(req.headers['x-test-user']); next(); },
}));
jest.mock('../utils/notificationService', () => ({
  sendNotification: jest.fn(), sendNotificationBatch: jest.fn(),
  getSystemAdminIds: (...a) => mockAdminIds(...a),
  sendWithNativeAddressee: (...a) => mockSendNative(...a),
}));

const express = require('express');
const request = require('supertest');
const { shouldAcknowledgeTicket } = require('../utils/inquiryAck');
const { inquiryAcknowledgedEmail } = require('../utils/notificationTemplates');

const app = express();
app.use(express.json());
app.use('/t', require('../routes/support-tickets'));

const RA = { id: 501, role: 'Restaurant Admin', full_name: 'Store Admin', email: 'ra@example.com' };
const SA = { id: 1, role: 'System Admin', full_name: 'Admin', email: 'sa@example.com' };
const flush = () => new Promise((r) => setTimeout(r, 30));
const ackCalls = () => mockSendNative.mock.calls.filter((c) => c[1] === 'inquiry_acknowledged');

beforeEach(() => {
  mockCreate.mockReset(); mockFindByPk.mockReset(); mockSendNative.mockReset(); mockAdminIds.mockReset();
  mockCreate.mockImplementation(async (v) => ({ ...v }));
  mockFindByPk.mockImplementation(async (id) => ({ id, preferred_language: 'ko' }));
  mockAdminIds.mockResolvedValue([1]);
  mockSendNative.mockResolvedValue(undefined);
});

const post = (user, body) => request(app).post('/t').set('x-test-user', JSON.stringify(user)).send(body);

describe('접수 확인 — 보내는 경우', () => {
  test('매장 관리자 문의 → 문의 주인에게 inquiry_acknowledged 1건 · 그 사람 언어 · 관리자 알림은 그대로', async () => {
    const r = await post(RA, { subject: 'Printer not printing', description: 'Kitchen printer stopped', category: 'technical' });
    expect(r.status).toBe(201);
    await flush();
    const acks = ackCalls();
    expect(acks).toHaveLength(1);
    expect(acks[0][0]).toBe(501);
    const mail = acks[0][2]('https://dev.purplehere.com/go');
    expect(mail.subject).toMatch(/^문의가 접수되었습니다 — SUPP-/);
    expect(mail.html).toContain('1~2 영업일');
    expect(mockSendNative.mock.calls.filter((c) => c[1] === 'inquiry_received').map((c) => c[0])).toEqual([1]);
  });

  test('기능 요청·버그 신고(피드백)도 보냄', async () => {
    await post(RA, { subject: 'Please add X', description: 'idea', category: 'feature-request' });
    await post(RA, { subject: 'Button broken', description: 'bug', category: 'bug-report' });
    await flush();
    expect(ackCalls()).toHaveLength(2);
  });
});

describe('접수 확인 — 보내지 않는 경우', () => {
  test('[auto] 제목(화면 자동 오류 신고) → 0건', async () => {
    await post(RA, { subject: '[auto] TypeError on /pos', description: 'stack', category: 'bug-report' });
    await flush();
    expect(ackCalls()).toHaveLength(0);
  });
  test('diagnostic → 0건', async () => {
    await post(RA, { subject: 'Diagnostics bundle', description: 'x', category: 'diagnostic' });
    await flush();
    expect(ackCalls()).toHaveLength(0);
  });
  test('System Admin 본인 문의 → 0건', async () => {
    await post(SA, { subject: 'Internal', description: 'x', category: 'general' });
    await flush();
    expect(ackCalls()).toHaveLength(0);
  });
  test('System Admin 이 고객 대신 만든 문의(주인=고객) → 0건 — 고객이 쓴 글이 아님 (Fable 검증 2026-11-15)', async () => {
    mockFindByPk.mockImplementation(async (id) => ({ id: Number(id), role: 'Restaurant Admin', email: 'ra@example.com', full_name: 'Store Admin', preferred_language: 'ko' }));
    const r = await post(SA, { subject: 'Opened for you', description: 'written by admin', category: 'general', customerId: '501' });
    expect(r.status).toBe(201);
    expect(r.body.data.customerId).toBe('501');
    await flush();
    expect(ackCalls()).toHaveLength(0);
  });
});

describe('접수 확인 — 실패해도 접수는 성공', () => {
  test('보내기가 던져도 201', async () => {
    mockSendNative.mockRejectedValue(new Error('SMTP down'));
    const r = await post(RA, { subject: 'Hello', description: 'x', category: 'general' });
    expect(r.status).toBe(201);
    await flush();
  });
  test('언어 읽기가 던져도 201', async () => {
    mockFindByPk.mockRejectedValue(new Error('DB down'));
    const r = await post(RA, { subject: 'Hello', description: 'x', category: 'general' });
    expect(r.status).toBe(201);
    await flush();
  });
});

describe('규칙·메일 틀', () => {
  test('shouldAcknowledgeTicket 표', () => {
    expect(shouldAcknowledgeTicket({ customerId: '5', subject: 'Hi', category: 'general', customerRole: 'Restaurant Admin' })).toBe(true);
    expect(shouldAcknowledgeTicket({ customerId: '5', subject: '  [AUTO] x', category: 'general', customerRole: 'Restaurant Admin' })).toBe(false);
    expect(shouldAcknowledgeTicket({ customerId: '5', subject: 'x', category: 'diagnostic', customerRole: 'Restaurant Admin' })).toBe(false);
    expect(shouldAcknowledgeTicket({ customerId: '5', subject: 'x', category: 'general', customerRole: 'System Admin' })).toBe(false);
    expect(shouldAcknowledgeTicket({ subject: 'x' })).toBe(false);
  });
  test('4개 언어 · 고객 글은 이스케이프', () => {
    for (const lang of ['en', 'ko', 'zh', 'ms']) {
      const m = inquiryAcknowledgedEmail({ ticketNumber: 'SUPP-1', subject: 'A & "B"', description: 'x <img src=x onerror=1>' }, lang);
      expect(m.subject).toContain('SUPP-1');
      expect(m.subject).not.toContain('inquiryAck.');
      expect(m.html).not.toContain('inquiryAck.');
      expect(m.html).toContain('A &amp; &quot;B&quot;');
      expect(m.html).not.toContain('onerror=1>');
    }
  });
});
