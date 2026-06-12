import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  fullWidth = false,
  disabled = false
}) => {
  const baseStyles = "rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-brand-gold/20";

  const variants = {
    primary: "bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black shadow-[0_18px_40px_rgba(183,137,38,0.2)] hover:shadow-[0_20px_50px_rgba(183,137,38,0.25)]",
    outline: "border-2 border-brand-gold text-brand-gold bg-white hover:bg-brand-gold/10",
    ghost: "text-brand-cream hover:text-brand-gold hover:bg-white/10",
    danger: "bg-brand-red text-brand-cream hover:bg-brand-red-light"
  };

  const classes = `${baseStyles} ${variants[variant] || variants.primary} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button;
