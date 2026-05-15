import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialDomains } from '../data/mockDomains';

const SAVED_POSTS_KEY = 'domain-connect-saved-posts';
const USER_POSTS_KEY = 'domain-connect-user-posts';
const USER_ABOUT_KEY = 'domain-connect-user-about';

const getSavedFromStorage = () => {
  try {
    const raw = localStorage.getItem(SAVED_POSTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const getUserPostsFromStorage = () => {
  try {
    const raw = localStorage.getItem(USER_POSTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const getUserAboutFromStorage = () => {
  try {
    const raw = localStorage.getItem(USER_ABOUT_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [domains, setDomains] = useState(initialDomains);
  const [savedPostIds, setSavedPostIds] = useState(getSavedFromStorage);
  const [userPostsByEmail, setUserPostsByEmail] = useState(getUserPostsFromStorage);
  const [userAboutByEmail, setUserAboutByEmail] = useState(getUserAboutFromStorage);
  const navigate = useNavigate();

  const findDomainBySlug = (slug) => domains.find((d) => d.slug === slug);

  const ensureDomain = (domainName) => {
    const normalized = domainName.trim();
    if (!normalized) return null;

    const existing = domains.find(
      (d) => d.name.toLowerCase() === normalized.toLowerCase()
    );
    if (existing) {
      return existing;
    }

    const slug = normalized
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newDomain = {
      id: slug || Date.now().toString(),
      name: normalized,
      slug: slug || `domain-${Date.now()}`,
      memberCount: 1
    };

    setDomains((prev) => [...prev, newDomain]);
    return newDomain;
  };

  const joinExistingDomain = (domainSlug, userInfo) => {
    const domain = findDomainBySlug(domainSlug);
    if (!domain) return null;

    const updatedDomain = { ...domain, memberCount: domain.memberCount + 1 };
    setDomains((prev) =>
      prev.map((d) => (d.slug === domain.slug ? updatedDomain : d))
    );

    const newUser = {
      name: userInfo.name,
      email: userInfo.email,
      domainSlug: domain.slug,
      domainName: domain.name
    };
    setUser(newUser);
    navigate(`/community/${domain.slug}`);
    return newUser;
  };

  const signUpWithDomain = ({ name, email, password, existingDomainSlug, newDomainName }) => {
    void password; // placeholder to show it's captured for future backend

    let domain = null;

    if (newDomainName && newDomainName.trim()) {
      domain = ensureDomain(newDomainName);
    } else if (existingDomainSlug) {
      domain = findDomainBySlug(existingDomainSlug);
      if (domain) {
        const updatedDomain = {
          ...domain,
          memberCount: domain.memberCount + 1
        };
        setDomains((prev) =>
          prev.map((d) => (d.slug === domain.slug ? updatedDomain : d))
        );
      }
    }

    if (!domain) return null;

    const newUser = {
      name,
      email,
      domainSlug: domain.slug,
      domainName: domain.name
    };
    setUser(newUser);
    navigate(`/community/${domain.slug}`);
    return newUser;
  };

  const signIn = ({ email, domainSlug }) => {
    const domain = findDomainBySlug(domainSlug);
    if (!domain) return null;

    const updatedDomain = { ...domain, memberCount: domain.memberCount + 1 };
    setDomains((prev) =>
      prev.map((d) => (d.slug === domain.slug ? updatedDomain : d))
    );

    const newUser = {
      name: email.split('@')[0],
      email,
      domainSlug: domain.slug,
      domainName: domain.name
    };
    setUser(newUser);
    navigate(`/community/${domain.slug}`);
    return newUser;
  };

  const signOut = () => {
    setUser(null);
    navigate('/');
  };

  const toggleSavedPost = useCallback((domainSlug, postId) => {
    if (!user?.email) return;
    const key = `${user.email}:${domainSlug}`;
    setSavedPostIds((prev) => {
      const next = { ...prev };
      const list = next[key] || [];
      const has = list.includes(postId);
      next[key] = has ? list.filter((id) => id !== postId) : [...list, postId];
      try {
        localStorage.setItem(SAVED_POSTS_KEY, JSON.stringify(next));
      } catch (_) {}
      return next;
    });
  }, [user?.email]);

  const isPostSaved = useCallback(
    (domainSlug, postId) => {
      if (!user?.email) return false;
      const key = `${user.email}:${domainSlug}`;
      const list = savedPostIds[key] || [];
      return list.includes(postId);
    },
    [user?.email, savedPostIds]
  );

  const getSavedIdsForDomain = useCallback(
    (domainSlug) => {
      if (!user?.email) return [];
      const key = `${user.email}:${domainSlug}`;
      return savedPostIds[key] || [];
    },
    [user?.email, savedPostIds]
  );

  const addUserPost = useCallback(
    (domainSlug, post) => {
      if (!user?.email) return null;
      const newPost = {
        id: `user-${Date.now()}`,
        domainSlug,
        author: user.name,
        authorEmail: user.email,
        title: post.title,
        content: post.content,
        timestamp: 'Just now'
      };
      setUserPostsByEmail((prev) => {
        const next = { ...prev };
        next[user.email] = [...(next[user.email] || []), newPost];
        try {
          localStorage.setItem(USER_POSTS_KEY, JSON.stringify(next));
        } catch (_) {}
        return next;
      });
      return newPost;
    },
    [user]
  );

  const userPosts = useMemo(() => {
    if (!user?.email) return [];
    return userPostsByEmail[user.email] || [];
  }, [user?.email, userPostsByEmail]);

  const updateUser = useCallback((updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const changeDomain = useCallback(
    (newDomainSlug) => {
      const domain = findDomainBySlug(newDomainSlug);
      if (!domain) return null;
      setUser((prev) =>
        prev
          ? { ...prev, domainSlug: domain.slug, domainName: domain.name }
          : null
      );
      navigate(`/community/${domain.slug}`);
      return domain;
    },
    [findDomainBySlug, navigate]
  );

  const changePassword = useCallback((_currentPassword, _newPassword) => {
    // Placeholder for future backend; no-op for frontend-only
    return Promise.resolve({ ok: true });
  }, []);

  const currentUserAbout = useMemo(() => {
    if (!user?.email) return '';
    return userAboutByEmail[user.email] || '';
  }, [user?.email, userAboutByEmail]);

  const setUserAbout = useCallback(
    (about) => {
      if (!user?.email) return;
      setUserAboutByEmail((prev) => {
        const next = { ...prev, [user.email]: about };
        try {
          localStorage.setItem(USER_ABOUT_KEY, JSON.stringify(next));
        } catch (_) {}
        return next;
      });
    },
    [user?.email]
  );

  const value = useMemo(
    () => ({
      user,
      domains,
      signUpWithDomain,
      signIn,
      signOut,
      joinExistingDomain,
      ensureDomain,
      findDomainBySlug,
      toggleSavedPost,
      isPostSaved,
      getSavedIdsForDomain,
      addUserPost,
      userPosts,
      updateUser,
      changeDomain,
      changePassword,
      currentUserAbout,
      setUserAbout
    }),
    [
      user,
      domains,
      toggleSavedPost,
      isPostSaved,
      getSavedIdsForDomain,
      addUserPost,
      userPosts,
      updateUser,
      changeDomain,
      changePassword,
      currentUserAbout,
      setUserAbout
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

