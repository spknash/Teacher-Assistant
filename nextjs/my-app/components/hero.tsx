"use client";
import {
    MotionValue,
    motion,
    useMotionValue,
    useMotionValueEvent,
  } from "framer-motion";
  import { Dispatch, SetStateAction, useEffect, useState } from "react";
  import { FiLogIn } from "react-icons/fi";
  
  type ListOrderItem = "front" | "middle" | "back";
  
  const DragShuffleHero = () => {
    const dragProgress = useMotionValue(0);
    const [order, setOrder] = useState<ListOrderItem[]>([
      "front",
      "middle",
      "back",
    ]);
    const [dragging, setDragging] = useState(false);
  
    const handleDragEnd = () => {
      const x = dragProgress.get();
      if (x <= -50) {
        const orderCopy = [...order];
        orderCopy.unshift(orderCopy.pop() as ListOrderItem);
        setOrder(orderCopy);
      }
    };
  
    useEffect(() => {
      const FIVE_SECONDS = 5000;
  
      // Automatically shuffle the list ever 5 seconds, so long
      // as it isn't being dragged
      const intervalRef = setInterval(() => {
        const x = dragProgress.get();
        if (x === 0) {
          setOrder((pv) => {
            const orderCopy = [...pv];
            orderCopy.unshift(orderCopy.pop() as ListOrderItem);
            return orderCopy;
          });
        }
      }, FIVE_SECONDS);
  
      return () => clearInterval(intervalRef);
    }, []);
  
    return (
      <section
        style={{ pointerEvents: dragging ? "none" : undefined }}
        className="overflow-hidden bg-slate-900 px-8 py-24 text-slate-50"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-8">
          <div>
            <h1 className="text-5xl font-black leading-[1.25] md:text-6xl">
              Explore, Learn and Build with guided projects
            </h1>
            <p className="mb-8 mt-4 text-lg text-slate-400">
            Dive into coding with our step-by-step guided projects, each enhanced by an AI assistant to support your 
            learning journey. From foundational concepts to advanced applications, our platform offers an interactive experience
            , empowering you to build skills and create real-world projects.
            </p>
            <div
                className="flex items-center gap-2"
            >
             <button
      className={`
        relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px] 
        border-indigo-300 px-4 py-2 font-semibold
        uppercase text-indigo-300 transition-all duration-500
        
        before:absolute before:inset-0
        before:-z-10 before:translate-x-[150%]
        before:translate-y-[150%] before:scale-[2.5]
        before:rounded-[100%] before:bg-indigo-300
        before:transition-transform before:duration-1000
        before:content-[""]

        hover:scale-105 hover:text-neutral-900
        hover:before:translate-x-[0%]
        hover:before:translate-y-[0%]
        active:scale-95`}
    >
      <FiLogIn />
      <span>Try It For Free</span>
    </button> 
              
            </div>
          </div>
          <motion.div
            whileTap={{ scale: 0.985 }}
            className="relative h-[450px] w-[350px]"
          >
            <Card
              imgUrl="/brain.png"
              testimonial="Our AI assistant customizes your learning experience, ensuring progress at your own pace and style"
              handleDragEnd={handleDragEnd}
              dragProgress={dragProgress}
              position={order[0]}
              dragging={dragging}
              setDragging={setDragging}
            />
            <Card
              imgUrl="/coding.png"
              testimonial="Engage in hands-on coding projects that build your skills and enhance your portfolio for real-world applications."
              handleDragEnd={handleDragEnd}
              dragProgress={dragProgress}
              position={order[1]}
              dragging={dragging}
              setDragging={setDragging}
            />
            <Card
              imgUrl="/network.png"
              testimonial="Be part of a collaborative community, sharing insights, receiving support, and growing together in your coding journey."
              handleDragEnd={handleDragEnd}
              dragProgress={dragProgress}
              position={order[2]}
              dragging={dragging}
              setDragging={setDragging}
            />
          </motion.div>
        </div>
      </section>
    );
  };
  
  interface CardProps {
    handleDragEnd: Function;
    dragProgress: MotionValue<number>;
    testimonial: string;
    position: ListOrderItem;
    imgUrl: string;
    setDragging: Dispatch<SetStateAction<boolean>>;
    dragging: boolean;
  }
  
  
  const Card = ({
    handleDragEnd,
    dragProgress,
    testimonial,
    position,
    imgUrl,
    setDragging,
    dragging,
  }: CardProps) => {
    const dragX = useMotionValue(0);
  
    useMotionValueEvent(dragX, "change", (latest) => {
      // When component first mounts, dragX will be a percentage
      // due to us setting the initial X value in the animate prop.
      if (typeof latest === "number" && dragging) {
        dragProgress.set(latest);
      } else {
        // Default back to 0 so that setInterval can continue
        dragProgress.set(0);
      }
    });
  
    const onDragStart = () => setDragging(true);
  
    const onDragEnd = () => {
      setDragging(false);
      handleDragEnd();
    };
  
    const x = position === "front" ? "0%" : position === "middle" ? "33%" : "66%";
    const rotateZ =
      position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg";
    const zIndex = position === "front" ? "2" : position === "middle" ? "1" : "0";
  
    const draggable = position === "front";
  
    return (
      <motion.div
        style={{
          zIndex,
          x: dragX,
        }}
        animate={{ rotate: rotateZ, x }}
        drag
        dragElastic={0.35}
        dragListener={draggable}
        dragConstraints={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        transition={{
          duration: 0.35,
        }}
        className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md ${
          draggable ? "cursor-grab active:cursor-grabbing" : ""
        }`}
      >
        <img
          src={imgUrl}
          className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-slate-700 bg-slate-200 object-cover"
        />
        <span className="text-center text-lg italic text-slate-400">
          {testimonial}
        </span>
        
      </motion.div>
    );
  };
  
  export default DragShuffleHero;