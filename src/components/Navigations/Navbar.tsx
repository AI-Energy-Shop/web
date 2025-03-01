import NavList from './NavList';
import NavSearchBar from './NavSearchBar';
import CartButton from './CartButton';
import UserIconButton from './UserIconButton';
import WarehouseIconButton from './WarehouseIconButton';
import Logo from './Logo';
interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex max-w-[1200px] h-20 items-end justify-between mx-auto gap-10 py-[0.5rem]">
        <Logo />
        <NavList />
        <NavSearchBar />
        <div className="flex gap-2 items-end h-full">
          <WarehouseIconButton />
          <UserIconButton />
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
