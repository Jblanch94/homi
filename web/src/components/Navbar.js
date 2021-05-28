import { Flex, Text, Box, Link as RebassLink } from 'rebass';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@emotion/react';

const Navbar = () => {
  const theme = useTheme();
  return (
    <Flex alignItems="center" justifyContent="space-between" mx={2} mb={4}>
      <RebassLink as={RouterLink} sx={{ textDecoration: 'none' }} to="/">
        <Text
          p={2}
          fontWeight="bold"
          fontSize={[24, 32]}
          color={theme.colors.blueGrotto}
          sx={{
            ':hover': {
              color: theme.colors.lightBlue,
            },
          }}>
          Homi
        </Text>
      </RebassLink>

      <Box mx="auto" />
      <RebassLink
        as={RouterLink}
        to="/login"
        display="inline-block"
        mr={4}
        color={theme.colors.blue}
        sx={{
          ':hover': {
            color: theme.colors.lightBlue,
          },
        }}>
        Log into Homi
      </RebassLink>
      <RebassLink
        display="inline-block"
        p={2}
        bg="#fff"
        color={theme.colors.blue}
        to="/sign-up"
        as={RouterLink}
        sx={{
          textDecoration: 'none',
          border: `${theme.colors.blue} 1px solid`,
          borderRadius: '0.4em',
          ':hover': {
            background: theme.colors.blue,
            color: '#fff',
          },
        }}>
        Sign up for Homi
      </RebassLink>
    </Flex>
  );
};

export default Navbar;
