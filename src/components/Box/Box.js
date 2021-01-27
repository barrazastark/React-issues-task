import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Box.scss";
import Label from "components/Label";

export const blockName = "box-wrapper";

const Box = ({ issue: { title, labels, comments, daysAgo, user, number }, isSelected }) => {
    const boxRef = useRef(null);

    useEffect(() => {
        const { top, bottom } = boxRef.current.getBoundingClientRect();
        const isInViewPort = top >= 0 && bottom <= (boxRef.current.innerHeight || document.documentElement.clientHeight);
        if(isSelected && !isInViewPort){
            boxRef.current.scrollIntoView({ behavior: "smooth" });
        }

    }, [isSelected]);

    return (
        <div data-testid="box" ref={boxRef} className={`${blockName} ${isSelected ? `${blockName}--isSelected` : '' }`}>
            <p className={`${blockName}__title`}>{title}</p>
            <div className={`${blockName}__labels`}>
                {labels.map(({ id, name, color }) => (
                    <Label key={id} name={name} color={color} />
                ))}
            </div>
            <span className={`${blockName}__comments`}>{`Comments: ${comments}`}</span>
            <p className={`${blockName}__user-info`}>{`#${number} Opened ${daysAgo === 0 ? 'today' : `${daysAgo} days ago`} by ${user}`}</p>
        </div>
    )
};

Box.propTypes = {
    issue: PropTypes.shape({
        title: PropTypes.string,
        labels: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            color: PropTypes.string,
            name: PropTypes.string,
        })),
        comments: PropTypes.number,
        user: PropTypes.string,
        daysAgo: PropTypes.number,
        number: PropTypes.number,
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,
}

export default Box;