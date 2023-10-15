import Typography from '../general/typography';
import ImageWrapper from './image-wrapper';
import Card from '../layout/card';
import PropTypes from 'prop-types';
import { formatDate } from '../../lib/utils';
import { BookOpenCheckIcon } from 'lucide-react';

const BlogCards = ({
  blog,
}) => {
  return (
    <Card className="mx-auto flex w-full max-w-sm max-h-[550px] hover:border hover:border-emerald-300 hover:scale-105 transition-all cursor-pointer flex-col justify-center items-center gap-4 p-8 md:gap-8">
      <div className="">
        <ImageWrapper
          width={320}
          height={150}
          src={blog?.node?.coverImage?.url}
          srcForDarkMode={blog?.node?.coverImage?.url}
          alt={'Blog-Cover'}
          className="max-w-[320px] max-h-[150px] min-h-[150px] object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Typography variant="subtitle" className="font-semibold text-gray-900 max-h-[70px] min-h-[70px]">
          {blog?.node?.title}
        </Typography>
        <Typography className={'text-sm opacity-40 flex justify-start items-center'}>
          {formatDate(blog?.node?.publishedAt)}
          {'  '}
          <BookOpenCheckIcon className='ml-3 mr-1' size={18} />
          {blog?.node?.readTimeInMinutes + " min read"}
        </Typography>
        <Typography className={'max-h-[150px] min-h-[150px]'}>
          {blog?.node?.brief}
        </Typography>
      </div>
      <div className="flex flex-col gap-4">
        Read more
      </div>
    </Card>
  );
};
BlogCards.propTypes = {
  blog: PropTypes.object
}
export default BlogCards;
