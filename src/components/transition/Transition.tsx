import "./Transition.scss";
import { motion } from "framer-motion";

const Transition = () => {
  const enterVariants = {
    initial: {
      scaleY: 1,
    },
    animate: {
      scaleY: 0,
      transition: {
        ease: "circOut",
        duration: 0.6,
      },
    },
    exit: {
      scaleY: 0,
    },
  };

  const exitVariants = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 0,
    },
    exit: {
      scaleY: 1,
      transition: {
        ease: "circOut",
        duration: 0.6,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={enterVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="transition enter"
      ></motion.div>
      <motion.div
        variants={exitVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="transition exit"
      ></motion.div>
    </>
  );
};

export default Transition;
