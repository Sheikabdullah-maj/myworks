package com.vrmm.websource.pojo;

public class ResponsePojo {

	private boolean status;
	private String response;
	private long code;
	public long getCode() {
		return code;
	}
	public void setCode(long code) {
		this.code = code;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getResponse() {
		return response;
	}
	public void setResponse(String response) {
		this.response = response;
	}
}
