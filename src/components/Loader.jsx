/**
 * Loader component displays a loading animation with a brain emoji.
 * It centers the animation on the screen and uses Tailwind CSS classes for styling.
 *
 * @returns {JSX.Element} The rendered loader component.
 */
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-memory-pattern">
      <div className="relative w-24 h-24">
        <div className="absolute inset-2 border-4 border-primary rounded-full animate-ping"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary text-3xl font-bold">🧠</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
