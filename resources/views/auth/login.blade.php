@extends('layouts.app')

@section('content')
<div class="auth-form login">
    <h1 class="title">Log In</h1>

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <label for="email" class="">{{ __('Email') }}</label>
        <input id="email" type="email" class="" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
        @error('email')
        <p class="invalid-feedback" role="alert">
            <strong>{{ $message }}</strong>
        </p>
        @enderror

        <label for="password" class="">{{ __('Password') }}</label>
        <input id="password" type="password" class="" name="password" required autocomplete="current-password">
        @error('password')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror

        <div class="form-check">
            <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

            <span class="form-check-label" for="remember">
                {{ __('Remember Me') }}
            </span>
        </div>
        <button type="submit" class="submit">
            {{ __('Login') }}
        </button>

        @if (Route::has('password.request'))
            <a class="remember-link" href="{{ route('password.request') }}">
                {{ __('Forgot Your Password?') }}
            </a>
        @endif
    </form>
</div>
@endsection
