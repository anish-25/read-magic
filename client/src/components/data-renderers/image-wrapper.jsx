import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
const ImageWrapper = ({
  src,
  alt,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const finalSrc = src;

  return <img src={finalSrc} alt={alt} {...props} />;
};
ImageWrapper.propTypes = {
  srcForDarkMode: PropTypes.any,
  src: PropTypes.string,
  alt: PropTypes.string
}
export default ImageWrapper;
