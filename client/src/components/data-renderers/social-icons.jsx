import IconButton from '../general/icon-button';
import { socialLinks } from '../../lib/configurables';
import PropTypes from 'prop-types'
const SocialIcons = ({uniqueid}) => {
  return (
    <div className="flex gap-1">
      {socialLinks.map((socialLink, index) => (
        <IconButton
          aria-label={socialLink.label}
          role="button"
          id = {socialLink.label+uniqueid}
          key={index}
          onClick={() => window.open(socialLink.url, '_blank')}
        >
          <socialLink.icon />
        </IconButton>
      ))}
    </div>
  );
};
SocialIcons.displayName = 'SocialIcons';
SocialIcons.propTypes = {
  uniqueid: PropTypes.number,
};
export default SocialIcons;
