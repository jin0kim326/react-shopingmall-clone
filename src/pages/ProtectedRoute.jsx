import React from 'react';
import { useAuthContext } from '../components/context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children, requireAdmin}) {
    const {user} = useAuthContext();

    if (!user || (requireAdmin && !user.isAdmin)) {
        return <Navigate to='/' replace />;  {/**replace는 되돌아가기 버튼 허용여부 */}
    }
    return children;

    // 로그인한 사용자가 있는지 확인
    // 그 사용자가 어드민인지 확인
    // requireAdmin이 true인 경우에는 로그인도 되어있어야하고, admin권한도 있어야함
    // => 조건이 맞다 - 전달된 children을 보여줌
    // => 조건이 맞지않다 - 상위경로로 이동!
}

