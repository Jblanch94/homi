import { Button } from 'rebass';
import { useTheme } from '@emotion/react';

const Home = () => {
  const theme = useTheme();
  return (
    <Button
      sx={{
        color: theme.colors.lightBlue,
        background: theme.colors.blueGrotto,
      }}>
      Home
    </Button>
  );
};

export default Home;
