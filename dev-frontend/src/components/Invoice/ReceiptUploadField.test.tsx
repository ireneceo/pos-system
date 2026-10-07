import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ReceiptUploadField, { validateReceiptFile, RECEIPT_MAX_BYTES } from './ReceiptUploadField';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (k: string) => k }),
}));

const fileOf = (name: string, type: string, size: number) => {
  const f = new File(['x'], name, { type });
  Object.defineProperty(f, 'size', { value: size });
  return f;
};

test('validateReceiptFile: PDF·이미지는 받고, 5MB 초과·txt 는 거절', () => {
  expect(validateReceiptFile(fileOf('bank.pdf', 'application/pdf', 1000))).toBeNull();
  expect(validateReceiptFile(fileOf('r.jpg', 'image/jpeg', 1000))).toBeNull();
  expect(validateReceiptFile(fileOf('r.webp', 'image/webp', RECEIPT_MAX_BYTES))).toBeNull();
  expect(validateReceiptFile(fileOf('big.pdf', 'application/pdf', RECEIPT_MAX_BYTES + 1))).toBe('tooLarge');
  expect(validateReceiptFile(fileOf('note.txt', 'text/plain', 10))).toBe('badType');
  expect(validateReceiptFile(fileOf('x.svg', 'image/svg+xml', 10))).toBe('badType');
});

test('끌어다 놓기: 5MB 초과·txt 는 onError, 값은 그대로', () => {
  const onChange = jest.fn();
  const onError = jest.fn();
  render(<ReceiptUploadField value="" onChange={onChange} onError={onError} />);
  const zone = screen.getByTestId('receipt-upload-field');

  fireEvent.drop(zone, { dataTransfer: { files: [fileOf('big.pdf', 'application/pdf', RECEIPT_MAX_BYTES + 1)] } });
  fireEvent.drop(zone, { dataTransfer: { files: [fileOf('note.txt', 'text/plain', 10)] } });

  expect(onError).toHaveBeenNthCalledWith(1, 'receiptUpload.tooLarge');
  expect(onError).toHaveBeenNthCalledWith(2, 'receiptUpload.badType');
  expect(onChange).not.toHaveBeenCalled();
});

test('끌어다 놓기: PDF 는 data URL 로 넘어간다', async () => {
  const onChange = jest.fn();
  const onError = jest.fn();
  render(<ReceiptUploadField value="" onChange={onChange} onError={onError} />);
  const zone = screen.getByTestId('receipt-upload-field');
  const pdf = new File(['%PDF-1.4'], 'bank.pdf', { type: 'application/pdf' });

  fireEvent.drop(zone, { dataTransfer: { files: [pdf] } });

  await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
  expect(String(onChange.mock.calls[0][0])).toMatch(/^data:application\/pdf;base64,/);
  expect(onError).toHaveBeenCalledWith(null);
});
