const productService = require('../services/product.service');

/**
 * Tìm kiếm sản phẩm với các bộ lọc, phân trang và sắp xếp
 * @param {Object} req - Express request object với các query params
 * @param {Object} res - Express response object
 */
exports.searchProducts = async (req, res) => {
  try {
    // Lấy các tham số tìm kiếm từ query parameters
    const {
      q,
      brand,
      model,
      gender,
      minPrice,
      maxPrice, // filter params
      page,
      limit, // pagination params
      sortBy,
      sortDirection, // sorting params
    } = req.query;

    // Gọi service để tìm kiếm sản phẩm với các tùy chọn nâng cao
    const result = await productService.searchProducts({
      // Các bộ lọc
      filters: {
        q,
        brand,
        model,
        gender,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      },
      // Thông tin phân trang
      pagination: {
        page: page ? parseInt(page, 10) : 1,
        limit: limit ? parseInt(limit, 10) : 10,
      },
      // Thông tin sắp xếp
      sort: {
        sortBy,
        sortDirection,
      },
    });

    // Trả về kết quả với cấu trúc chuẩn
    res.json(result);
  } catch (err) {
    console.error('Error searching products:', err);
    res.status(500).json({
      error: 'Failed to search products',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};
