import PropTypes from 'prop-types'
const Container = ({id,children}) => {
  return ( 
    <section id={id} className={"min-h-[calc(100vh-84px)] flex justify-center items-center min-w-full transition-all duration-300"}>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 md:gap-12 md:px-8 h-full justify-center items-center">
        {children}
        </div>
    </section>
  )
}
Container.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  children: PropTypes.node
}
export default Container