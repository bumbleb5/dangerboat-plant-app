import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import AddPlantForm from './addPlantForm';

describe('Add plant form test', () => {
    test('Clicking next with typing a botanical name displays an alert', () => {
        render(<AddPlantForm />);

        userEvent.click(screen.getByText('Next'));

        let alert = screen.getByText('Common name is a required', { exact: false });

        expect(alert).toBeInTheDocument();
    });

});