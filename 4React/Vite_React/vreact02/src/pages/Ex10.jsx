import { useEffect, useState } from "react";
import "./Ex10.Css";
import data from "./Ex10data.js";
const Table = () => {
  const [ea, setEa] = useState(Array(data.length).fill(0));
  const [total, setTotal] = useState(0);
  console.log(ea);
  const handleInputChange = (index, e) => {
    const value = e.target.value;
    console.log(`Row index: ${index}, Input value: ${value}`);

    /* ea 배열 업데이트 */
    const newEa = [...ea];
    newEa[index] = Number(value);
    setEa(newEa);
  };
  /* ea 변경시 때 마다 계산 */
  useEffect(() => {
    const sum = ea.reduce((sum, quantity, index) => {
      return (
        sum +
        (quantity * data[index].price +
          (quantity > 0 ? data[index].delivery_price : 0))
      );
    }, 0);
    setTotal(sum);
  }, [ea]);
  return (
    <>
      <h1>10. 데이터 임포트 테이블화</h1>
      <div>{JSON.stringify(data)}</div>
      <div className="tableDiv">
        <table>
          <thead>
            <tr>
              <th>제품명</th>
              <th>가격</th>
              <th>제품분류</th>
              <th>배송비</th>
              <th>갯수</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.product_name}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.delivery_price}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    {ea[index] > 0
                      ? item.price * ea[index] + item.delivery_price
                      : 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <td colSpan={5}>
              총&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              합
            </td>
            <td id="total">{total}</td>
          </tfoot>
        </table>
      </div>
    </>
  );
};
export default Table;
