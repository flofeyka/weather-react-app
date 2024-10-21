import SearchCity from "./SearchCity";

export default function Header({setCityState}: {setCityState: (value) => void}) {
  return (
    <header className="w-screen h-[8vh] border-b px-14 flex items-center ">
        <div>
            
        </div>
      <SearchCity setCityState={setCityState}/>
    </header>
  );
}
