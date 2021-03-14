export class Product {
	 constructor(
    public code: number,
    public name: string,
    public cost: number,
	public mrp: number,
	public retailPrice: number,
	public wholesalerPrice: number,
	public sgst: number,
	public cgst: number,
	public igst: number,
	public category: string,
	public manufacturer: string,
	public unitDesc: string,
	public stockLocation: string,
	public hsnacs: number,
	public active: boolean
	 ) { }
}