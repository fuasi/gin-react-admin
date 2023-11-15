import { motion } from "framer-motion";

const ViewAnimated = ({children}: {children: React.ReactNode}) => {
  return (
    <motion.div
      initial={{opacity: 0 , x: 40}}
      animate={{opacity: 1 , x: 0}}
      exit={{opacity: 0 , x: 40}}
    >
      {children}
    </motion.div>
  )
}

export default ViewAnimated
