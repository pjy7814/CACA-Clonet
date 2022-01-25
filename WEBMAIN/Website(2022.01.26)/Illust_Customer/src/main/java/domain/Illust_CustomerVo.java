package domain;

public class IllustVO {
	private String user_id;
	private String repo_name;
	private String directory_path;
	
	public IllustVO(String user_id, String repo_name, String directory_path) {
		this.setUser_id(user_id);
		this.setRepo_name(repo_name);
		this.setDirectory_path(directory_path);
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getRepo_name() {
		return repo_name;
	}

	public void setRepo_name(String repo_name) {
		this.repo_name = repo_name;
	}

	public String getDirectory_path() {
		return directory_path;
	}

	public void setDirectory_path(String directory_path) {
		this.directory_path = directory_path;
	}
	
}
