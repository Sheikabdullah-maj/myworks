package com.vrmm.websource.repository;

import java.sql.PreparedStatement;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import com.vrmm.websource.model.Product;

@Repository
public class ProductJdbcRepository {

	@Autowired
	JdbcTemplate jdbcTemplate;

	public boolean insertProduct(Product product) {
		String sql = " INSERT INTO product( code,name,cost,mrp,retailPrice,wholesalerPrice,sgst,cgst,igst,category,manufacturer,unitDesc,stockLocation,hsnacs,active) "
				+ " values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		return jdbcTemplate.update(sql,
				new Object[] {product.getCode(),product.getName(), product.getCost(), product.getMrp(),
						product.getRetailPrice(), product.getWholesalerPrice(), product.getSgst(), product.getCgst(),
						product.getIgst(), product.getCategory(), product.getManufacturer(), product.getUnitDesc(),
						product.getStockLocation(), product.getHsnacs(), product.isActive() }) > 0;
	}
	
	public Long getNextProductBarcode()
	{
		String sql = " select PRODUCT_ID_SEQ.NEXTVAL ";
		return jdbcTemplate.queryForList(sql, Long.class).get(0);
		
	}

	public boolean updateProduct(Product product) {
		String sql = " update product set name=?,cost=?,mrp=?,retailPrice=?,wholesalerPrice=?,"
				+ "sgst=?,cgst=?,igst=?,category=?,manufacturer=?,unitDesc=?,stockLocation=?,hsnacs=?,active=?  where code=? ";
		return jdbcTemplate.update(sql,
				new Object[] { product.getName(), product.getCost(), product.getMrp(), product.getRetailPrice(),
						product.getWholesalerPrice(), product.getSgst(), product.getCgst(), product.getIgst(),
						product.getCategory(), product.getManufacturer(), product.getUnitDesc(),
						product.getStockLocation(), product.getHsnacs(), product.isActive(), product.getCode() }) > 0;
	}

	public Product findByCode(long code) {
		return jdbcTemplate.queryForObject("select * from product where code=?", new Object[] { code },
				new BeanPropertyRowMapper<Product>(Product.class));
	}

	public List<Product> getAllProducts() {
		String sql = " select code,name,cost,mrp,retailPrice,wholesalerPrice,sgst,cgst,igst,category,manufacturer,unitDesc,stockLocation,hsnacs,active "
				+ " from product ";
		return jdbcTemplate.query(sql, new BeanPropertyRowMapper<Product>(Product.class));

	}

	public List<String> getProductsForAutoCompleteList() {
		String sql = " select code || '-' || name as item from product ";
		return jdbcTemplate.queryForList(sql, String.class);
	}
}
