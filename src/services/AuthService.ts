import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export const AuthService = {
  async registrar(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  async iniciarSesion(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  async cerrarSesion() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  },

  async obtenerSesion(): Promise<Session | null> {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  suscribirse(callback: (session: Session | null) => void) {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
    return () => data.subscription.unsubscribe();
  },
};