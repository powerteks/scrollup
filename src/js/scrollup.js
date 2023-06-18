/**
 * ScrollUp 1.0.0
 * Copyright 2023 Yurij Stepanov
 * Released on: April 21, 2023
 */

class ScrollUp
{
	static #instances = 0;

	constructor ( params = {} ) {
		ScrollUp.#instances++;

		if ( ScrollUp.#instances > 1 ) {
			throw new Error( 'Only one instance can be created class ScrollUp' );
		}

		this.setParameters( params );

		this.render();
		this.startScrollUp();

		if ( this.controlFocus ) {
			this.processFocus();
		}
	}

	render () {
		if ( this.create ) {
			this.wrapper = document.createElement('div');
			this.wrapper.classList.add( this.class + this.classWrapper );

			const container = document.createElement('div');

			container.classList.add( this.classContainer, this.classContainer + '_' + this.class );
			this.wrapper.append( container );

			this.scrollup = document.createElement( this.mainElement );
			this.scrollup.classList.add( this.class );
			
			if ( this.mainElement === 'a' ) {
				this.scrollup.href = '#' + this.id;
				document.querySelector( this.topElement ).id = this.id;
			}

			let linkBody = this.text ? `<span class=${this.spanClass}>${this.text}</span>` : '';
			linkBody += this.createSvg ? this.svg : '';

			this.scrollup.innerHTML += linkBody;
			container.append( this.scrollup );

			document.querySelector('body').append( this.wrapper );
		}
	}

	startScrollUp () {
		this.scrollup.addEventListener( 'click', e => this.handleСlick( e ) );
		this.toggleBlock();
		window.addEventListener( 'scroll', () => this.toggleBlock() );
	}

	toggleBlock () {
		this.isShow() ? this.scrollup.classList.add( this.classShow ) : this.scrollup.classList.remove( this.classShow );
	}

	isShow () {
		return window.pageYOffset >= this.pointShow ? true : false;
	}

	handleСlick ( e ) {
		e.preventDefault();

		if ( Math.max( document.body.scrollTop, document.documentElement.scrollTop ) > 0 ) {
			document.querySelector( this.topElement ).scrollIntoView({
				behavior: this.behavior,
				block: 'start',
			});
		}
	}

	processFocus () {
		this.focusableElementsInBlock();
		let nextFocusElement = null;
		let nextIndex = null;
		let counter = 0;

		document.addEventListener( 'keydown', event => {
			if ( event.key === 'Tab' && !event.shiftKey ) {
				if ( nextFocusElement !== null && counter > -1 && counter < 2 ) {
					event.preventDefault();
					nextFocusElement.focus();
					nextFocusElement = this.focusableFirstElements[ nextIndex ];
					counter++;
				}
				if ( nextFocusElement !== null && counter === 2 ) {
					nextFocusElement = null;
					nextIndex = null;
					counter = 0;
				}
				if ( this.isShow() && this.focusableLastElements.indexOf( event.target ) > -1 ) {
					nextFocusElement = this.scrollup;

					if ( this.focusableLastElements.indexOf( event.target ) !== this.focusableLastElements.length - 1 ) {
						nextIndex = this.focusableLastElements.indexOf( event.target ) + 1;
					} else {
						nextIndex = 0;
					}
				}
			}
		});
	}

	focusableElementsInBlock () {
		this.focusableLastElements = [];
		this.focusableFirstElements = [];
		const mainBlocks = document.querySelectorAll( this.classMainBlocks );

		mainBlocks.forEach( block => {
			const focusableElements = block.querySelectorAll(
				'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
			);

			if ( focusableElements.length > 1 ) {
				this.focusableFirstElements.push( focusableElements[ 0 ] );
				this.focusableLastElements.push( focusableElements[ focusableElements.length - 2 ] );
			} else {
				this.focusableFirstElements.push( focusableElements[ 0 ] );
				this.focusableLastElements.push( 0 );
			}
		});

		const index = this.focusableFirstElements.indexOf( this.scrollup );

		if ( index > -1 ) {
			this.focusableFirstElements.splice( index, 1 );
			this.focusableLastElements.splice( index, 1 );
		}
	}

	setParameters ( params ) {
		const defaultParams = defaultParameters();

		for ( const key in defaultParams ) {
			this[ key ] = params.hasOwnProperty( key ) ? params[ key ] : defaultParams[ key ];
		}
	}
}

function defaultParameters() {
	return {
		behavior: 'smooth',
		class: 'scrollup',
		classContainer: 'container',
		classMainBlocks: '.container',
		classShow: '_show',
		classWrapper: '__wrapper',
		controlFocus: true,
		create: true,
		createSvg: true,
		createText: true,
		mainElement: 'button',
		id: 'up',
		pointShow: 300,
		spanClass: 'vh',
		svg: '<svg width="25" height="25" viewBox="0 0 25 25"><path d="m 9.9473107,7.814128 c -1.408866,1.406022 -7.680206,7.746709 -8.6319721,8.702894 -0.95176612,0.956183 0.4664356,2.361615 1.4053017,1.417191 0.9388661,-0.944424 8.0084927,-8.076235 8.6298877,-8.702895 0.621395,-0.62666 1.652894,-0.654462 2.301859,0 0.648964,0.654461 7.678015,7.748219 8.629886,8.702895 0.951871,0.954676 2.346023,-0.471208 1.405303,-1.417191 -0.94072,-0.945984 -7.195426,-7.271297 -8.631972,-8.702894 -1.436546,-1.431596 -3.699427,-1.406021 -5.1082933,0 z"/></svg>',
		text: 'В начало страницы',
		topElement: 'body',
	};
}