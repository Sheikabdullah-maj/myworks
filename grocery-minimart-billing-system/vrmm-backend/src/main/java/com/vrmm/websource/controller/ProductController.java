package com.vrmm.websource.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.vrmm.websource.model.Product;
import com.vrmm.websource.pojo.ResponsePojo;
import com.vrmm.websource.repository.ProductJdbcRepository;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/product")
public class ProductController {
	private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
	
	@Autowired
	ProductJdbcRepository productJdbc;

	@GetMapping("/healthCheck")
	public @ResponseBody String healthCheck() {
		return "Product Service is reachable";
	}
	
	@PostMapping("/insertProduct")
	public @ResponseBody ResponsePojo insertProduct(@RequestBody Product product)
	{
		ResponsePojo response = new ResponsePojo();
		boolean status = false;
		try {
			product.setCode(productJdbc.getNextProductBarcode());
			status = productJdbc.insertProduct(product);
		} catch (Exception e) {
			// TODO: handle exception
			logger.debug("Exception happened in insertProduct:",e);
		}
		response.setStatus(status);
		response.setCode(status?product.getCode():0);
		response.setResponse(status?"Success":"Failure");
		return response;
	}
	
	@PostMapping("/updateProduct")
	public @ResponseBody ResponsePojo updateProduct(@RequestBody Product product)
	{
		ResponsePojo response = new ResponsePojo();
		boolean status = false;
		try {
			status = productJdbc.updateProduct(product);
		} catch (Exception e) {
			// TODO: handle exception
			logger.debug("Exception happened in updateProduct:",e);
		}
		response.setStatus(status);
		response.setResponse(status?"Success":"Failure");
		return response;
	}

	@GetMapping("/getProductById")
	public @ResponseBody Product getProductByCode(@PathParam("code") long code) {
		Product product = null;
		try {
			product = productJdbc.findByCode(code);
		} catch (Exception e) {
			logger.debug("Exception happened in getProductByCode:",e);
		}
		return product;
	}
	
	@GetMapping("/getAllProducts")
	public @ResponseBody List<Product> getAllProducts() {
		List<Product> products = null;
		try {
			products = productJdbc.getAllProducts();
		} catch (Exception e) {
			logger.debug("Exception happened in getAllProducts:",e);
		}
		return products;
	}
	
	@GetMapping("/getProductsForAutoCompleteList")
	public @ResponseBody List<String> getProductsForAutoCompleteList() {
		System.out.println("Service is reachable");
		List<String> productsList = null;
		try {
			productsList = productJdbc.getProductsForAutoCompleteList();
		} catch (Exception e) {
			logger.debug("Exception happened in getProductsForAutoCompleteList:",e);
		}
		return productsList;
	}
	
}
