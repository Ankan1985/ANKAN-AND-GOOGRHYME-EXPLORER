import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Play, RotateCcw } from 'lucide-react';

const NUMBERS_DATA: Record<number, { title: string; poem: string; color: string; bg: string }> = {
  1: {
    title: "One",
    poem: "One is a pillar, strong and tall,\nThe first of many, standing through all.\nA single candle in the dark,\nThe beginning of a brilliant spark.",
    color: "text-orange-500",
    bg: "bg-orange-50"
  },
  2: {
    title: "Two",
    poem: "Two is a couple, a pair in flight,\nLike wings of a bird in the morning light.\nA duet sung in perfect rhyme,\nTwo hands ticking away the time.",
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  3: {
    title: "Three",
    poem: "Three is a clover, luck in the field,\nA triangle of strength that will never yield.\nThree sides of a pyramid bold,\nA story of wonders yet to be told.",
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  4: {
    title: "Four",
    poem: "Four is a table, steady and square,\nA solid foundation with balance to spare.\nFour seasons turning through the year,\nFour corners bringing the compass near.",
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  5: {
    title: "Five",
    poem: "Five is a hand, with fingers that reach,\nA grasp on the world and a lesson to teach.\nA star with points that glow so bright,\nGuiding explorers through the night.",
    color: "text-rose-500",
    bg: "bg-rose-50"
  },
  6: {
    title: "Six",
    poem: "Six is a hive, where busy bees dwell,\nA hexagon pattern in every cell.\nSix sides on a die that rolls on the floor,\nA lucky number that asks for more.",
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  7: {
    title: "Seven",
    poem: "Seven is a rainbow, arching so high,\nA ribbon of colors across the sky.\nSeven days in a week that fly by fast,\nSeven wonders of the world built to last.",
    color: "text-indigo-500",
    bg: "bg-indigo-50"
  },
  8: {
    title: "Eight",
    poem: "Eight is a spider, spinning with grace,\nLegs in a circle in its webby place.\nAn infinity sign stood on its end,\nA loop that goes on, my little friend.",
    color: "text-pink-500",
    bg: "bg-pink-50"
  },
  9: {
    title: "Nine",
    poem: "Nine is a cloud, floating so free,\nAlmost reaching the end of the sea.\nThe last single digit, a powerful sign,\nWatching the stars as they start to align.",
    color: "text-cyan-500",
    bg: "bg-cyan-50"
  },
  10: {
    title: "Ten",
    poem: "Ten is a mountain, reaching the top,\nThe journey is complete, now let's stop.\nTen toes on your feet, ten fingers to snap,\nA perfect finish to this rhyming map.",
    color: "text-slate-800",
    bg: "bg-slate-100"
  }
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showPoem, setShowPoem] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!showPoem && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPoem]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const num = parseInt(userInput);
    
    if (isNaN(num) || num < 1 || num > 10) {
      setError("Please enter a number between 1 and 10.");
      return;
    }

    // Allow jumping to any valid number
    setCurrentStep(num);
    setError('');
    setShowPoem(true);
  };

  const handleNext = () => {
    setShowPoem(false);
    setUserInput('');
  };

  const resetGame = () => {
    setCurrentStep(1);
    setShowPoem(false);
    setUserInput('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] font-sans selection:bg-black selection:text-white flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {currentStep > 10 ? (
          <motion.div
            key="finish"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="max-w-md w-full text-center space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center"
              >
                <Sparkles className="w-20 h-20 text-amber-500" />
              </motion.div>
              <h1 className="text-5xl font-display uppercase tracking-wider">Master of Numbers!</h1>
              <p className="text-xl text-[#57534e]">You've explored all the rhymes from 1 to 10. The journey was magnificent!</p>
            </div>
            <button
              onClick={resetGame}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95"
            >
              Play Again
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </motion.div>
        ) : showPoem ? (
          <motion.div
            key={`poem-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`max-w-2xl w-full p-8 md:p-16 rounded-[2rem] ${NUMBERS_DATA[currentStep].bg} border-2 border-black/5 shadow-2xl space-y-12 relative overflow-hidden`}
          >
            {/* Background Number Decal */}
            <div className="absolute -top-10 -right-10 text-[20rem] font-black opacity-5 pointer-events-none select-none leading-none">
              {currentStep}
            </div>

            <div className="space-y-4 relative">
              <header className="flex items-center gap-4">
                <span className={`text-sm font-bold uppercase tracking-widest ${NUMBERS_DATA[currentStep].color}`}>Number {currentStep}</span>
                <div className={`h-px flex-1 ${NUMBERS_DATA[currentStep].color} opacity-20 bg-current`} />
              </header>
              <h2 className={`text-7xl md:text-9xl font-display tracking-tight ${NUMBERS_DATA[currentStep].color}`}>
                {NUMBERS_DATA[currentStep].title}
              </h2>
            </div>

            <div className="space-y-8 relative">
              <p className="text-2xl md:text-4xl font-medium leading-tight whitespace-pre-line text-[#44403c] italic">
                {NUMBERS_DATA[currentStep].poem}
              </p>
            </div>

            <motion.button
              whileHover={{ x: 10 }}
              onClick={handleNext}
              className="flex flex-col items-start gap-2 group"
            >
              <span className="text-xs font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                Found the rhythm?
              </span>
              <div className="flex items-center gap-4 text-2xl font-display uppercase tracking-wider hover:opacity-70 transition-opacity">
                Choose Another
                <ArrowRight className="w-8 h-8" />
              </div>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="input"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-md w-full text-center space-y-12"
          >
            <div className="space-y-2">
              <h1 className="text-6xl md:text-7xl font-display tracking-tight uppercase leading-none">
                NumRhyme<br/><span className="text-[#a8a29e]">Explorer</span>
              </h1>
              <p className="text-[#78716c] font-medium uppercase tracking-widest text-sm">Interactive Poetic Journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value);
                    if (error) setError('');
                  }}
                  autoFocus
                  placeholder="Pick a number..."
                  className="w-full text-center text-9xl font-display bg-transparent border-b-4 border-black/10 focus:border-black outline-none placeholder:text-black/5 transition-all py-4"
                />
                
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -bottom-8 left-0 right-0 text-rose-500 font-bold text-sm tracking-tight"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 px-10 py-5 bg-black text-white rounded-full font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  Show Poem
                  <Play className="w-5 h-5 fill-current" />
                </button>
              </div>
            </form>

            <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setUserInput(n.toString());
                    if (error) setError('');
                  }}
                  className={`aspect-square flex items-center justify-center rounded-xl font-bold transition-all ${
                    n === currentStep 
                      ? "bg-black text-white scale-110 shadow-md" 
                      : "bg-white border hover:bg-black/5 text-black/40"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-8 text-[10px] uppercase tracking-[0.2em] font-bold text-black/20 pointer-events-none">
        A Poetic Exploration of Numbers
      </footer>
    </div>
  );
}
