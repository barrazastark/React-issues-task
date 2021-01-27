import { render, screen } from "@testing-library/react";

import Label from "./Label";

it('should render correctly', () => {
    const minProps = {
        name: 'label test',
        color: 'orange',
    };

    render(<Label {...minProps} />);

    expect(screen.getByText(minProps.name)).toBeInTheDocument()
});