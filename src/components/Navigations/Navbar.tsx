import NavList from './NavList';
import NavSearchBar from './NavSearchBar';
import CartButton from './CartButton';
import UserIconButton from './UserIconButton';
import WarehouseIconButton from './WarehouseIconButton';
import Logo from './Logo';
import SideNavigation from './SideNavigation';
interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  return (
    <header className="z-50 w-full h-auto border-b bg-white relative">
      <div className="flex max-w-[1200px] h-20 items-end justify-between mx-auto py-[0.5rem]">
        <Logo />
        <NavList />
        <NavSearchBar />
        <div className="gap-2 items-end h-full hidden lg:flex">
          <WarehouseIconButton />
          <UserIconButton />
          <CartButton />
        </div>
      </div>
      <SideNavigation />
    </header>
  );
};

export default NavigationBar;
