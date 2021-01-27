import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";


import App from "./App";

import { getReactIssues } from "./services";

jest.mock('./services');


it('should render correctly', async () => {
    getReactIssues.mockResolvedValue([{ id: 1, title: '', labels: []}])
    render(<App />);

    await waitFor(() => {
        expect(screen.getByTestId('input')).toBeInTheDocument()
        expect(getReactIssues).toHaveBeenCalledTimes(1);
    })
    
});

