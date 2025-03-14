import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure,
    Button,
    useTheme,
    useMediaQuery,
    Grid,
    GridItem
  } from '@chakra-ui/react';
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@chakra-ui/icons';
import ButtonCategories from './ButtonCategories';
  
import "../../styles/styled.css";
import '../../styles/nav.css';
  
import logo from '../../assets/icons/logo.svg';
import ButtonShoppingCart from './ButtonShoppingCart';
  
export default function Nav() {
  const { isOpen, onToggle } = useDisclosure();
  const { breakpoints } = useTheme();
  const [isGreaterThanMd] = useMediaQuery(`(min-width: ${breakpoints.md})`);
  const [isGreaterThanXL] = useMediaQuery(`(min-width: ${breakpoints.xl})`);
  
  return (
    <Box>
      <Flex
        bg={useColorModeValue('transparent', 'gray.800')}
        color={useColorModeValue('gray.600', 'gray.600')}
        boxShadow={"rgb(221, 221, 221) 0px 4px 8px 0px"}
        minH={'60px'}
        py={{ base: 6 }}
        px={{ base: 10 }}
        align={'center'}>
        <img style={{ zIndex: 1 }} onClick={() => window.location.href = "/"} src={logo} width='100px' height='56px' alt="logo" />
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'center' }}>
          <Flex zIndex={1} display={{ base: 'none', md: 'none', lg: 'none', xl: 'flex' }}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={isGreaterThanMd ? 'center' :  "end"}
          padding={"0px 1rem"}
          direction={'row'}>
          <ButtonShoppingCart />
          <Button
            display={isGreaterThanXL ? "flex" : "none"}
            zIndex={1}
            width={"104px"}
            height={"37px"}
            fontSize={'md'}
            fontWeight={500}
            variant={'link'}
            bg={"#FFF"}
            ml={2}
            color={"#000"}
            border={"1px solid #064A73"}
            as='a'
            onClick={() => window.location.href = '/cotizar'}
            borderRadius='5px'
            _hover={{
                cursor: 'pointer'
            }}>
            Cotizar
          </Button>
        </Stack>
        <Flex
          flex={{ base: 0.5, md: 'auto' }}
          justifyContent={"end"}
          display={{ base: 'flex', xl: 'none' }}>
          <IconButton
            onClick={onToggle}
            zIndex={1}
            icon={
              isOpen ? <CloseIcon w={3} h={3} color='#6F6F6F'/> : <HamburgerIcon w={5} h={5} color='#6F6F6F' />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
  
const DesktopNav = () => {
  const linkColor = useColorModeValue('#424242', '#424242');
  const linkHoverColor = useColorModeValue('#424242', '#424242');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  
  return (
    <Stack direction={'row'} spacing={4} alignItems='center'>
      <Flex gap={14}>
        <GridItem colSpan={1}>
          <ButtonCategories />
        </GridItem>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label} alignItems='center'>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <GridItem h={"100%"} pt={2.5}>
                <PopoverTrigger id="popover" textAlign={"center"}>
                    <Link
                      
                      textAlign={"end"}
                      href={navItem.href ?? '#'}
                      fontSize={"16px"}
                      fontWeight={500}
                      color={linkColor}
                      _hover={{
                        textDecoration: 'none',
                        color: linkHoverColor,
                      }}>
                      {navItem.label}
                    </Link>
                </PopoverTrigger>
              </GridItem>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Flex>
    </Stack>
  );
};
  
const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};
  
const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ xl: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};
  
const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        zIndex={1}
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} zIndex={1} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
  
const NAV_ITEMS = [
  {
    label: 'Proyectos especiales',
    href: '/proyectos-especiales',
  },
  {
    label: 'Temporalidades',
    href: '/temporalidades',
  },
  {
    label: 'Nosotros',
    href: '/nosotros',
  },
  {
    label: 'Contacto',
    href: '/contacto',
  }
];