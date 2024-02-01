const PreferenceNav = () => {
  return (
    <div className="flex items-center justify-between bg-stone-900/30 h-11 w-full">
      <button className="flex cursor-pointer items-center rounded text-left focus:outline-none bg-stone-500/10 text-white/40 hover:bg-stone-500/12 px-2 py-1.5 font-medium">
        <div className="flex items-center px-1">
          <div className="text-xs text-label-2">Javascript</div>
        </div>
      </button>
    </div>
  );
};

export default PreferenceNav;
