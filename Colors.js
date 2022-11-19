/*
 HIN HIN HIN PRODUCTION
 */

/**
 * @typedef iRGBA
 * @property {number} R 0-255
 * @property {number} G 0-255
 * @property {number} B 0-255
 * @property {number} A 0-255
 */


/**
 * @typedef iHSLA
 * @property {number} H 0-359
 * @property {number} S 0-1
 * @property {number} L 0-1
 * @property {number} A 0-1
 */


/**
 * @typedef iNORMALIZED
 * @property {number} R 0-1
 * @property {number} G 0-1
 * @property {number} B 0-1
 * @property {number} A 0-1
 */


/**
 * @typedef iHEXA
 * @property {string} R "00"-"FF"
 * @property {string} G "00"-"FF"
 * @property {string} B "00"-"FF"
 * @property {string} A "00"-"FF"
 */

/**
 *
 */
class Colors
{
	/** @type {iRGBA} */
	rgba;

	/** @type {iNORMALIZED} */
	normalized;

	/** @type {iHEXA} */
	hexa;

	/** @type {iHSLA} */
	hsla;


	/**
	 *
	 * @param {number} r
	 * @param {number} g
	 * @param {number} b
	 * @param {number} a
	 */
	constructor (r, g, b, a = 255)
	{
		this.rgba = this._setRGBA (r, g, b, a);
		this._calcFromRGBA ();
	}


	/**
	 *
	 * @return {iRGBA}
	 */
	getRGB ()
	{
		return this.rgba;
	}


	/**
	 *
	 * @return {iNORMALIZED}
	 */
	getNormalized ()
	{
		return this.normalized;
	}


	/**
	 *
	 * @return {iHEXA}
	 */
	getHex ()
	{
		return this.hexa;
	}


	/**
	 *
	 * @return {iHSLA}
	 */
	getHSL ()
	{
		return this.hsla;
	}


	/**
	 *
	 * @param {number} value
	 * @return {Colors}
	 */
	setRgbaR (value)
	{
		this.rgba.R = this._colorClamp (value);
		this._calcFromRGBA ();
		return this;
	}


	/**
	 *
	 * @param {number} value
	 * @return {Colors}
	 */
	setRgbaG (value)
	{
		this.rgba.G = this._colorClamp (value);
		this._calcFromRGBA ();
		return this;
	}


	/**
	 *
	 * @param {number} value
	 * @return {Colors}
	 */
	setRgbaB (value)
	{
		this.rgba.B = this._colorClamp (value);
		this._calcFromRGBA ();
		return this;
	}


	/**
	 *
	 * @param {number} value
	 * @return {Colors}
	 */
	setRgbaA (value)
	{
		this.rgba.A = value;
		this._calcFromRGBA ();
		return this;
	}


	/**
	 *
	 * @param {number} r
	 * @param {number} g
	 * @param {number} b
	 * @param {number} a
	 * @return {Colors}
	 */
	setRGBA (r, g, b, a= 255)
	{
		this.rgba = this._setRGBA (r, g, b, a);
		this._calcFromRGBA ();
		return this;
	}


	/**
	 *
	 * @return {string}
	 */
	toCSS_rgb ()
	{
		return `rgb(${ this.rgba.R }, ${ this.rgba.G }, ${ this.rgba.B })`;
	}


	/**
	 *
	 * @param {number} precision
	 * @return {string}
	 */
	toCSS_rgba (precision = 2)
	{
		return `rgba(${ this.rgba.R }, ${ this.rgba.G }, ${ this.rgba.B }, ${ this.normalized.A.toFixed (precision) })`;
	}


	/**
	 *
	 * @return {string}
	 */
	toCSS_hex ()
	{
		return `#${ this.hexa.R }${ this.hexa.G }${ this.hexa.B }`;
	}


	/**
	 *
	 * @return {string}
	 */
	toCSS_hexA ()
	{
		return this.toCSS_hex () + this.hexa.A;
	}


	/**
	 *
	 * @param {number} precision
	 * @return {string}
	 */
	toCSS_hsl (precision = 2)
	{
		return `hsl(${ this.hsla.H.toFixed (precision) }, ${ ( this.hsla.S * 100 ).toFixed (precision) }%, ${ ( this.hsla.L * 100 ).toFixed (precision) }%)`;
	}


	/**
	 *
	 * @param {number} precision
	 * @param {number} precisionAlpha
	 * @return {string}
	 */
	toCSS_hsla (precision = 2, precisionAlpha = 2)
	{
		return `hsl(${ this.hsla.H.toFixed (precision) }, ${ ( this.hsla.S * 100 ).toFixed (precision) }%, ${ ( this.hsla.L * 100 ).toFixed (precision) }%, ${ this.hsla.A.toFixed (precisionAlpha) })`;
	}


	/**
	 *
	 */
	_calcFromRGBA ()
	{
		this.normalized = this._setNormalized (this.rgba.R, this.rgba.G, this.rgba.B, this.rgba.A);
		this.hexa = this._setHex (this.rgba.R, this.rgba.G, this.rgba.B, this.rgba.A);
		this.hsla = this._rgba2hsla (this.normalized);
	}


	/**
	 * @param {number} r
	 * @param {number} g
	 * @param {number} b
	 * @param {number} a
	 * @return {iRGBA}
	 * @private
	 */
	_setRGBA (r, g, b, a)
	{
		return {
			R: this._colorClamp (r),
			G: this._colorClamp (g),
			B: this._colorClamp (b),
			A: this._colorClamp (a)
		};
	}


	/**
	 * @param {number} r
	 * @param {number} g
	 * @param {number} b
	 * @param {number} a
	 * @return {iNORMALIZED}
	 * @private
	 */
	_setNormalized (r, g, b, a)
	{
		return {
			R: this._colorClamp (r) / 255,
			G: this._colorClamp (g) / 255,
			B: this._colorClamp (b) / 255,
			A: this._colorClamp (a) / 255
		};
	}


	/**
	 * @param {number} r
	 * @param {number} g
	 * @param {number} b
	 * @param {number} a
	 * @return {iHEXA}
	 * @private
	 */
	_setHex (r, g, b, a)
	{
		return {
			R: this._dec2hex (this._colorClamp (r)),
			G: this._dec2hex (this._colorClamp (g)),
			B: this._dec2hex (this._colorClamp (b)),
			A: this._dec2hex (this._colorClamp (a))
		};
	}


	/**
	 *
	 * @param {number} num
	 * @returns {number}
	 * @private
	 */
	_colorClamp (num)
	{
		return Math.min (Math.max (Math.round (num), 0), 255);
	}


	/**
	 *
	 * @param {number} v
	 * @returns {string}
	 * @private
	 */
	_dec2hex (v)
	{
		return v.toString (16).padStart (2, "0").toUpperCase ();
	}


	/**
	 * @param normalized
	 * @return {iHSLA}
	 * @private
	 */
	_rgba2hsla (normalized)
	{
		const normR = normalized.R;
		const normG = normalized.G;
		const normB = normalized.B;
		const v = Math.max (normR, normG, normB);
		const c = v - Math.min (normR, normG, normB);
		const f = 1 - Math.abs (v + v - c - 1);
		const h = c
			&& (
				v === normR
				? ( normG - normB ) / c
				: v === normG
				  ? 2 + ( normB - normR ) / c
				  : 4 + ( normR - normG ) / c
			);

		return {
			H: 60 * ( h < 0 ? h + 6 : h ),
			S: ( f ? c / f : 0 ),
			L: ( ( v + v - c ) / 2 ),
			A: this.normalized.A
		};
	}


	/**
	 *
	 * @param h
	 * @param s
	 * @param l
	 * @param a
	 * @return {iRGBA}
	 * @private
	 */
	_hsla2rgba (h, s, l, a)
	{
		const v = s * Math.min (l, 1 - l);
		const f = (n, k = ( n + h / 30 ) % 12) => l - v * Math.max (Math.min (k - 3, 9 - k, 1), -1);
		return {
			R: f (0),
			G: f (8),
			B: f (4),
			A: a
		};
	}
}