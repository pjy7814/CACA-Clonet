package persistence;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import domain.IllustVO;

public class IllustDAO {
	
	private static IllustDAO instance = new IllustDAO();
	
	// 싱글톤. 해당 패턴은 객체 생성 시 딱 한번 생성자가 호출되면서 객체를 만들며 사용. (생성자 안에 DB연결 부분 넣으면 작동 안함.)
	public static IllustDAO getInstance() {
		return instance;
	}
	
	// 객체 생성 시 DB 커넥션 생성
	public IllustDAO() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			System.out.println("DB 연결 성공");
		}catch (Exception e) {
			System.out.println("DB 연결 실패");
			e.printStackTrace();
		}
	}
	
	// DB 연결 끊어주는 함수
	public void close(Connection con, PreparedStatement pstmt, ResultSet rs) {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (pstmt != null) {
			try {
				pstmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (con != null) {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	

	
	// 일러스트 띄우기 수행. (메서드마다 처음에 DB연결을 하게 해야함.)
	public ArrayList<IllustVO> select(){
		
		ArrayList<IllustVO> list = new ArrayList<IllustVO>();  // 리스트 저장할 변수 선언.
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			
			// rds 연결 전에 필요한 정보들 선언
		    String dbName = "clonet_database";
		    String userName = "admin";
		    String password = "qwer1234";
		    String hostname = "";  // db 엔드포인트 들어갈것.

		    String jdbcUrl = "jdbc:mysql://" + hostname + "/" + dbName; /*"?user=" + userName + "&password=" + password;*/
		    con = DriverManager.getConnection(jdbcUrl, userName, password);
		    
		    System.out.println("DB connection success");
		    
			String sql = "select directory_path from repository where repo_name = any(select repo_name from mapping_repo_user where user_id = 'user1');"; // 데이터베이스의 리포지토리 테이블에서 리포지 이름과 path를 반환.
			pstmt = con.prepareStatement(sql);   // pstmt 안에 sql 문 적용된것 저장.
			rs = pstmt.executeQuery(sql);  			   // pstmt 에 저장된 sql문의 결과값을 반환함.
			
			
			// rs에서 값을 추출하여 리스트로 가공함.
			while(rs.next()) {
				String user_id = "a";
				String repo_name = "b"; 
				String directory_path = rs.getString("directory_path");
				
				IllustVO illustVO = new IllustVO(user_id, repo_name, directory_path);
				list.add(illustVO);  // 변수 list에 IllustVO의 내용을 더함.
				
				// 해당 단계에서 먼저 default로 false 설정해야 함.
				
			}

					
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {  // DB 정보 불러오고 결과 출력했으면 바로 끊어져야함.
			this.close(con, pstmt, rs);
			System.out.println("DB disconnected");
		}
		System.out.println(list);
		return list;  // user_id, repo_name, directory_path 가 들어있는 리스트를 반환한다.
	}
	

}
