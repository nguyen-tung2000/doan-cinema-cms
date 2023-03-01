import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Flex, Box } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

interface SiteHeaderProps {
  menuName: string;
  menuHref: string;
  heading?: string;
  children?: React.ReactNode;
  showButton?: React.ReactNode;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  menuName,
  menuHref,
  heading,
  children,
  showButton,
}) => {
  return (
    <Box mx={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={menuHref}>
            {menuName}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {children}
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>{heading || ''}</Heading>
        {showButton}
      </Flex>
    </Box>
  );
};
