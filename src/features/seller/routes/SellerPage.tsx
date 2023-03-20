import { Box, BreadcrumbItem, BreadcrumbLink, Flex } from "@chakra-ui/react";
import { format } from "date-fns";
import * as React from "react";

import { SiteHeader } from "@/components";
import { ROUTES } from "@/constants";
import { getRangeDate } from "@/features/seller";
import { ShowTimesListV2 } from "@/features/showtimes";
import { useAuth } from "@/lib/auth";
import { Authorization, ROLES } from "@/lib/authorization";

export const SellerPage = () => {
  const { rangeDate, startDay } = getRangeDate();
  const { user } = useAuth();
  const [activeDate, setActiveDate] = React.useState<string>(format(startDay, "MM/dd/yyyy"));

  return (
    <Box>
      <Authorization
        forbiddenFallback={<div>Only manager and user can view this.</div>}
        allowedRoles={[ROLES.MANAGER, ROLES.USER]}
      >
        <SiteHeader
          menuName="Lịch chiếu"
          menuHref={ROUTES.SELLER}
          heading={`Lịch chiếu phim | suất chiếu `}
        >
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Suất chiếu phim</BreadcrumbLink>
          </BreadcrumbItem>
        </SiteHeader>
        <Flex justifyContent="flex-start">
          <ShowTimesListV2
            rangeDate={rangeDate}
            activeDate={activeDate}
            setActiveDate={setActiveDate}
            cinemaId={user?.cinema._id || ""}
            isMineCinema
          />
        </Flex>
      </Authorization>
    </Box>
  );
};
