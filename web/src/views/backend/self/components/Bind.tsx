import { List } from "antd";

const Bind = () => {
  const data = ["绑定手机", "绑定邮箱"]


  return (
    <div>
      <List size={ "large" } dataSource={ data } bordered renderItem={ (item) => <List.Item>
        <div>
          <span>
            { item }
          </span>
          <div className={ "mt-2" }>
            <span className={ "text-slate-500" }>暂未{ item }</span>
          </div>
        </div>
        <div>
          <a>点击绑定</a>
        </div>
      </List.Item> }/>
    </div>
  )
}
export default Bind