import pool from '../config/db-config.js';

export async function query(sql, params) {
    try {
        const connection = await pool.getConnection();

        try {
            const [a,b] = await connection.query(sql, params);
            /*
            .query() 為mysql2庫的語法，返回一個包含兩個元素的數組：[rows, fields]
            其中：
            params意為參數，.query會把參數填入sql中的問號
            rows(也就是result[0]) 是包含實際查詢結果的數組（可能有多行數據，每個元素代表一行數據）
            fields(result[1]) 是字段資訊，通常不使用
            */
            return a;   // 返回查詢結果
        } catch (error) {
            console.error(`資料庫查詢錯誤：${error}`);
            throw error;
        } finally {
            // 確保連接被釋放回連接池
            connection.release();
        }
    } catch (error) {
        console.error(`資料庫連線錯誤：${error}`);
        throw error;
    }
}