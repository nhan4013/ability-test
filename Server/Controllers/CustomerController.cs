using Microsoft.AspNetCore.Mvc;
using Server.Models;
namespace Server.Controllers;


[ApiController]
[Route("[controller]")]
public class CustomerController : ControllerBase
{
   

    private readonly NorthwindContext _NorthWindContext;

    public CustomerController(NorthwindContext northwindContext)
    {
        this._NorthWindContext =northwindContext;
    }
    
    
    [HttpGet("customers")]
    public  IActionResult Get()
    {
        var customer= this._NorthWindContext.Customers.ToList();
        return Ok(customer);
    }
}
