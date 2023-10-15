import Typography from '../general/typography';
import CustomLink from '../general/custom-link';
import ImageWrapper from './image-wrapper';
import PropTypes from 'prop-types'
const TechDetails = ({ url, logo, darkModeLogo, label }) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <CustomLink noCustomization to={url} externalLink>
                <ImageWrapper
                    width={64}
                    height={64}
                    src={logo}
                    srcForDarkMode={darkModeLogo}
                    alt={label}
                    className="transition-transform duration-300 md:hover:scale-110 h-[64px]"
                />
            </CustomLink>
            <Typography variant="body1">{label}</Typography>
        </div>
    );
};
TechDetails.propTypes = {
    url: PropTypes.string,
    logo: PropTypes.any,
    darkModeLogo: PropTypes.any,
    label: PropTypes.string
}
export default TechDetails;
