@extends('layouts.app')

@section('content')
<div class="auth-form register">
    <h1 class="title">Sign Up</h1>

    <form method="POST" action="{{ route('register') }}" class="login-form">
        @csrf

        <label for="name" class="">{{ __('Name') }}</label>
        <input id="name" type="text" class="" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>
        @error('name')
            <p class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </p>
        @enderror

        <label for="email" class="">{{ __('E-Mail Address') }}</label>
        <input id="email" type="email" class="" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
        @error('email')
        <p class="invalid-feedback" role="alert">
            <strong>{{ $message }}</strong>
        </p>
        @enderror
        <br />
        <label for="password" class="">{{ __('Password') }}</label>
        <input id="password" type="password" class="" name="password" required autocomplete="current-password">
        @error('password')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror
        <label for="password-confirm" class="">{{ __('Confirm Password') }}</label>
        <input id="password-confirm" type="password" class="" name="password_confirmation" required autocomplete="new-password">
        
        <button type="submit" class="submit">
            {{ __('Register') }}
        </button>
    </form>
</div>
@endsection
