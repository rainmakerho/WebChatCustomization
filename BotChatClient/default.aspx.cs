using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BotChatClient
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            var dt = new DataTable();
            dt.Columns.Add("id", typeof(int));
            dt.Columns.Add("name", typeof(string));
            dt.Columns.Add("desc", typeof(string));
            for(var i = 0;  i < 11; i++)
            {
                dt.Rows.Add(i + 1, $"Name - {i + 1}", $"Description - {i + 1}");
            }
            this.GridView1.DataSource = dt;
            this.GridView1.DataBind();
        }
    }
}