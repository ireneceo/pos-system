import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Button } from './Button';

test('async onClick: rapid triple-click fires handler exactly once (double-submit guard)', async () => {
  let resolveFn: () => void = () => {};
  const onClick = jest.fn(() => new Promise<void>((res) => { resolveFn = res; }));
  render(<Button onClick={onClick as any}>Save</Button>);
  const btn = screen.getByText('Save') as HTMLButtonElement;

  fireEvent.click(btn);
  fireEvent.click(btn);
  fireEvent.click(btn);

  // Synchronous ref guard blocks clicks 2 and 3 while the promise is pending.
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(btn.disabled).toBe(true);

  // Settle → button re-enables and accepts a new click.
  resolveFn();
  await waitFor(() => expect(btn.disabled).toBe(false));
  fireEvent.click(btn);
  expect(onClick).toHaveBeenCalledTimes(2);
});

test('sync onClick: fires on every click (backward compatible)', () => {
  const onClick = jest.fn();
  render(<Button onClick={onClick}>Go</Button>);
  const btn = screen.getByText('Go');
  fireEvent.click(btn);
  fireEvent.click(btn);
  fireEvent.click(btn);
  expect(onClick).toHaveBeenCalledTimes(3);
});

test('disabled button never fires', () => {
  const onClick = jest.fn();
  render(<Button onClick={onClick} disabled>Nope</Button>);
  fireEvent.click(screen.getByText('Nope'));
  expect(onClick).not.toHaveBeenCalled();
});
