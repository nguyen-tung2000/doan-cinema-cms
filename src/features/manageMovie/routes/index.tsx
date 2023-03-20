import { MovieResult } from "@/features/manageMovie";
import { Authorization, ROLES } from "@/lib/authorization";

export const ManageMovie = () => {
  return (
    <main>
      <Authorization
        forbiddenFallback={<div>Only manager can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <MovieResult />
      </Authorization>
    </main>
  );
};
