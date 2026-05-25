import React from 'react';
import { Button } from '@mui/material';

interface ContinueButtonProps {
  onPress?: () => void;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({ onPress }) => {
  return (
    <Button
      onClick={onPress}
      sx={{
        backgroundColor: '#FFFFFF',
        color: '#FF8C00',
        fontSize: 18,
        fontWeight: 500,
        textTransform: 'none',
        borderRadius: '16px',
        paddingX: 4,
        paddingY: 1.5,
        transition: 'transform 0.2s ease',
        '&:hover': {
          backgroundColor: '#FFFFFF',
          transform: 'translateY(-3px)',
        },
      }}
    >
      Продолжить
    </Button>
  );
};
