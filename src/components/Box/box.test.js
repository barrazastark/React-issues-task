import { render, screen } from "@testing-library/react";

import Box, { blockName } from "./Box";

it('should render correctly', () => {
    const minProps = {
        issue: {
            title: 'Test title',
            labels: [],
            comments: 1,
            daysAgo: 1,
            user: 'test user',
            number: 1,
        },
        isSelected: false,
    };

    const { rerender } = render(<Box {...minProps}  />);
    expect(screen.getByText(minProps.issue.title)).toBeInTheDocument()
    rerender(<Box {...minProps} isSelected={true} />);
    expect(screen.getByTestId('box').classList.contains(`${blockName}--isSelected`)).toBe(true)
});