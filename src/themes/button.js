// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
const Button = {
  // The styles all button have in common
  baseStyle: {
    borderRadius: "base", // <-- border radius is same for all variants and sizes
    _focus: "none",
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    solid: {
      bg: "brand.500",
      color: "white",
    },
    withIconBW: {
      display: "flex",
      alignItems: "center",
      bg: "none",
      color: "#000",
      fontSize: "normal",
      fontWeight: "light",
      gap: "5px",
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    //variant: 'outline',
  },
};

export default Button;
