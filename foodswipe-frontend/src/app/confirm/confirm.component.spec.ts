import { render } from '@testing-library/angular'
import { ConfirmComponent } from './confirm.component';

describe('ConfirmComponent', () => {

  test('should create', async () => {
    await render(ConfirmComponent)
    expect(ConfirmComponent).toBeTruthy();
  });
});
