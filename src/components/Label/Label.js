import PropTypes from "prop-types";
import "./Label.scss";

const blockName = "label-wrapper";

const Label = ({ name, color }) => {
    return (
        <div className={blockName} style={{ backgroundColor: `#${color}`}}>
            {name}
        </div>
    )
};

Label.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
}

export default Label;