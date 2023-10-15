import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'
const ImageWrapper = ({
  srcForDarkMode,
  src,
  alt,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const finalSrc = theme === 'dark' ? srcForDarkMode || src : src;

  return <img src={finalSrc} alt={alt} {...props} />;
};
ImageWrapper.propTypes = {
  srcForDarkMode: PropTypes.any,
  src: PropTypes.string,
  alt: PropTypes.string
}
export default ImageWrapper;
