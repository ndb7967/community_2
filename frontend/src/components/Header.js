import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../UserContext";

export default function Header() {
    const {userInfo, setUserInfo} = useContext(UserContext);
    /* 페이지가 로드되면서 자동으로 profile API 호출 */
    useEffect(() => {
      fetch('http://localhost:7777/profile', {
        credentials: 'include',
      }).then(response => {
        /* 서버로부터 전달 받은 값으로 username 초기화 */
        response.json().then(userInfo => {
          setUserInfo(userInfo);
        });
      });
    }, []); /* 빈 배열로 useEffect 무한 루프 문제 해결 */

    function logout() {
      fetch('http://localhost:7777/logout', {
        credentials: 'include',
        method: 'POST',
      });
      setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
      <header>
        <Link to="/" className="logo">우주 블로그</Link>
        <nav>
          {username && (
            <>
              <Link to="/create">글쓰기</Link>
              <a onClick={logout}>로그아웃</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/register">회원가입</Link>
            </>
          )}
        </nav>
      </header>
    );
}
