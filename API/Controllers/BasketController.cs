using System;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket()
        {
            var basket = await RetrieveBasket();

            return basket == null ? NotFound() : basket;
        }

        [HttpPost]
        public async Task<ActionResult> AddItem(int productId, int quantity)
        {
            // check if basket exists
            var basket = await RetrieveBasket() ?? CreateBasket();

            var product = await _context.Products.FindAsync(productId);

            if (product == null) return NotFound();
            
            basket.AddItem(product, quantity);

            var successOnSaving = await _context.SaveChangesAsync() > 0;

            return successOnSaving
                ? StatusCode(201)
                : BadRequest(new ProblemDetails { Title = "Problem on saving item to basket" });

        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();

            basket?.RemoveItem(productId, quantity);

            return StatusCode(200);
        }


        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
                { IsEssential = true, Expires = DateTimeOffset.Now.AddDays(20) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket { BuyerId = buyerId };

            _context.Baskets.Add(basket);

            return basket;
        }

        private async Task<Basket> RetrieveBasket()
        {
            var basket = await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
            return basket;
        }
    }
}
